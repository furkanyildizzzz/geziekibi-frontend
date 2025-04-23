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
import { useTranslation } from "react-i18next";

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

  const { t: tForm } = useTranslation("form");

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
    setDateList([...formValue?.tourDates]);
  }, [formValue]);

  const handleAddNewDate = (startDate: Date, endDate: Date) => {
    const newTourDate = {
      id: 0,
      startDate: startOfDay(startDate),
      endDate: startOfDay(endDate),
      prices: [],
      isActive: true,
      description: "",
    } as TourDateSuccessResponse;

    // Check if the date is already in the list
    const isDuplicate = dateList.some((s) => isSameDay(s.startDate, startDate));

    if (isDuplicate) {
      ShowError(
        tForm,
        `${startDate.toLocaleDateString("tr")} is already added`
      );
      return;
    }

    // Update the list with the new date and sort it
    setDateList((prev) =>
      [newTourDate, ...prev].sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      )
    );

    dispatch(
      setFormValue({
        name: "tourDates",
        value: [newTourDate, ...formValue.tourDates],
      })
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
            name: "tourDates",
            value: updatedDateList,
          })
        );
      }
    }
  };

  const handleFilterDateList = (startDate: Date, endDate: Date) => {
    const normalizedStartDate = startOfDay(startDate); // Reset time to 00:00:00
    const normalizedEndDate = startOfDay(endDate); // Reset time to 00:00:00

    const filteredList = (
      formValue.tourDates as TourDateSuccessResponse[]
    ).filter((item) => {
      // Normalize item start and end dates to compare only the date part
      const itemStartDate = startOfDay(new Date(item.startDate));
      const itemEndDate = startOfDay(new Date(item.endDate));

      // Check if the item's date range is fully between the given range
      return (
        itemStartDate >= normalizedStartDate && itemEndDate <= normalizedEndDate
      );
    });

    // Log the filtered list or update state with filtered results
    console.log("Filtered Date List:", filteredList);
    setDateList(filteredList);
  };

  return (
    <>
      <AddNewDate
        handleAddNewDate={handleAddNewDate}
        handleFilterDateList={handleFilterDateList}
      />
      {dateList.length > 0 &&
        dateList.map((d, index) => (
          <AddNewPricesForNewDate
            key={d.startDate.toString()}
            tourDate={d}
            accordionId={index.toString()}
            handleRemoveTourDate={handleRemoveTourDate}
          />
        ))}
    </>
  );
};

export default TourFour;
