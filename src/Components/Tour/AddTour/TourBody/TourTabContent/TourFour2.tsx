import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import {
  Add,
  AddTask,
  Cancel,
  ChooseYourCurrency,
  Description,
  SellingCurrency,
  SellingPrice,
  SellingPriceName,
} from "@/Constant/constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import DropDownComponent from "@/Components/General/Dropdown/DropDownComponent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTourPriceFormSchema,
  TourDateSchema,
} from "@/app/lib/definitions";
import { useCallback, useEffect, useState } from "react";
import {
  TourDateSuccessResponse,
  TourPriceSuccessResponse,
} from "@/Types/ApiResponseType";
import { CurrencyDisplayNames, CurrencyEnum } from "@/app/lib/enums";
import { TourDateAccordion } from "./TourFour/TourDateAccordion";
import { AddNewDate } from "./TourFour/AddNewDate";
import { AddNewPricesForNewDate } from "./TourFour/AddNewPricesForNewDate";
import ShowError from "@/Components/Toast/Error/ShowError";
import { isSameDay, startOfDay } from "date-fns";
import { tr } from "date-fns/locale/tr";

export const DropDownData = [
  {
    id: CurrencyEnum.TRY,
    name: CurrencyDisplayNames[CurrencyEnum.TRY],
    header: true,
  },
  {
    id: CurrencyEnum.EUR,
    name: CurrencyDisplayNames[CurrencyEnum.EUR],
  },
  {
    id: CurrencyEnum.USD,
    name: CurrencyDisplayNames[CurrencyEnum.USD],
  },
];

const TourFour = () => {
  const dispatch = useAppDispatch();
  const { formValue, isLoading: isLoadingTour } = useAppSelector(
    (state) => state.addProduct
  );

  const [dateList, setDateList] = useState<TourDateSuccessResponse[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    getValues,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(CreateTourPriceFormSchema),
    defaultValues: {
      id: 0,
      name: "New Price",
      price: 4500,
      currency: CurrencyEnum.TRY,
      description: "",
    },
  });

  const setExistingDateList = useCallback(async () => {
    console.log({ formValue });
    setDateList([...formValue?.dates]);
  }, [formValue]);

  const handleAddNewDate = (newDate: Date) => {
    const newTourDate = {
      id: 0,
      tourDate: startOfDay(newDate),
      prices: [],
      isActive: true,
      description: "",
    } as TourDateSuccessResponse;

    // Check if the date is already in the list
    const isDuplicate = dateList.some((s) => isSameDay(s.tourDate, newDate));

    if (isDuplicate) {
      ShowError(`${newDate.toLocaleDateString("tr")} is already added`);
      return;
    }

    // Update the list with the new date and sort it
    setDateList((prev) =>
      [newTourDate, ...prev].sort(
        (a, b) =>
          new Date(b.tourDate).getTime() - new Date(a.tourDate).getTime()
      )
    );

    dispatch(
      setFormValue({ name: "dates", value: [newTourDate, ...formValue.dates] })
    );
  };

  useEffect(() => {
    if (
      (formValue.id > 0 || formValue.copyTourId > 0) &&
      dateList.length === 0
    ) {
      setExistingDateList();
    }
  }, [setExistingDateList]);

  const handleRemoveTourDate = (index: number) => {
    if (window.confirm(`Are you sure you want to delete ?`)) {
      if (!isLoadingTour) {
        const updatedDateList = dateList.filter((_, i) => i !== index);

        setDateList(updatedDateList);
        dispatch(
          setFormValue({
            name: "dates",
            value: updatedDateList,
          })
        );
      }
    }
  };

  return (
    <>
      <AddNewDate handleAddNewDate={handleAddNewDate} />
      {/* {newTourDateList.length > 0 &&
        newTourDateList.map((t, index) => (
          <AddNewPricesForNewDate
            tourDate={t}
            accordionId={index.toString()}
            handleRemoveTourDate={handleRemoveTourDate}
          />
        ))} */}
      {dateList.length > 0 &&
        dateList.map((d, index) => (
          <AddNewPricesForNewDate
            key={d.tourDate.toString()}
            tourDate={d}
            accordionId={index.toString()}
            handleRemoveTourDate={handleRemoveTourDate}
          />
        ))}
    </>
  );
};

export default TourFour;
