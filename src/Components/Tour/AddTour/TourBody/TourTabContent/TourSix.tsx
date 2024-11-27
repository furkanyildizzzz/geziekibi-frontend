import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { TourTypeDisplayNames, TourTypeEnum } from "@/app/lib/enums";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TourDailyForm } from "./TourDailyForm";
import {
  setFormValue,
  updateDailyForm,
} from "@/Redux/Reducers/AddProductSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";

export interface FormData {
  id: number;
  breakfeast: string;
  lunch: string;
  dinner: string;
  description: string;
  dailyPaths: { id: number; name: string }[];
  dailyVisitingPlaces: { id: number; name: string }[];
}

const TourSix = () => {
  const dispatch = useAppDispatch();

  const { formValue, isLoading } = useAppSelector((state) => state.addProduct);

  const [dailyForms, setDailyForms] = useState([
    {
      id: 0,
      breakfeast: "",
      lunch: "",
      dinner: "",
      description: "",
      dailyPaths: [{ id: 0, name: "" }],
      dailyVisitingPlaces: [{ id: 0, name: "" }],
    },
  ]);

  const [dailyTabId, setDailyTabId] = useState(0);

  const { t } = useTranslation("common");

  const handleNewDailyForm = () => {
    const newForm = {
      id: 0,
      breakfeast: "",
      lunch: "",
      dinner: "",
      description: "",
      dailyPaths: [],
      dailyVisitingPlaces: [],
    };

    setDailyForms((prev) => {
      const updatedForms = [...prev, { ...newForm }]; // Yeni form eklenirken derin kopya
      dispatch(
        setFormValue({
          name: "dailyForms",
          value: updatedForms,
        })
      );
      return updatedForms;
    });

    setDailyTabId(dailyForms.length);
  };

  const removeDailyForm = (index: number) => {
    if (index === 0) return; // Prevent removing the first form
    setDailyTabId(index - 1);
    setDailyForms((prev) => {
      const updatedForms = [...prev.filter((_, i) => i !== index)];
      dispatch(
        setFormValue({
          name: "dailyForms",
          value: updatedForms,
        })
      );
      return updatedForms;
    });
  };

  const setExistingDailyForms = useCallback(async () => {
    setDailyForms([...formValue.dailyForms]);
  }, []);

  // useEffect(() => {
  //   dispatch(setFormValue({ name: "dailyForms", value: [...dailyForms] }));
  // }, [dailyForms]);

  useEffect(() => {
    if (formValue.id > 0) setExistingDailyForms();
  }, [setExistingDailyForms]);

  const handleFieldChange = (
    index: number,
    fieldName: keyof FormData,
    value: any
  ) => {
    dispatch(
      updateDailyForm({
        index,
        fieldName,
        value,
      })
    );

    setDailyForms((prev) => {
      const updatedForms = [...prev]; // Create a shallow copy of the previous state
      const updatedForm: any = { ...updatedForms[index] }; // Create a copy of the form at the specified index

      updatedForm[fieldName] = value; // Update the specific field

      updatedForms[index] = updatedForm; // Replace the form at the specified index with the updated one

      return updatedForms; // Return the updated array
    });
  };

  return (
    <div className="sidebar-body advance-options">
      <Nav
        className="border-tab mb-0"
        tabs
        style={{ overflowY: "hidden", overflowX: "auto" }}
      >
        {dailyForms.map((form, i) => (
          <NavItem key={i} style={{ position: "relative" }}>
            <NavLink
              active={dailyTabId === i ? true : false}
              onClick={() => setDailyTabId(i)}
              style={{ position: "relative", paddingRight: "25px" }} // Adjust for &times;
            >
              {`${i + 1}. ${t("Day")}`}
              {i > 0 && (
                <span
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent tab selection when clicking &times;
                    removeDailyForm(i);
                  }}
                  style={{
                    position: "absolute",
                    top: "5px", // Adjust to fine-tune positioning
                    right: "5px", // Position in the top-right corner
                    cursor: "pointer",
                    color: "#ff0000",
                    fontWeight: "bold",
                  }}
                >
                  &times;
                </span>
              )}
            </NavLink>
          </NavItem>
        ))}
        <NavItem>
          <NavLink onClick={handleNewDailyForm} style={{ cursor: "pointer" }}>
            Yeni Gün
          </NavLink>
        </NavItem>
      </Nav>

      <div className="meta-body">
        <TabContent activeTab={dailyTabId}>
          {dailyForms.map((form, i) => {
            return (
              <TabPane key={i} tabId={i}>
                <TourDailyForm
                  key={i}
                  formId={i}
                  formData={form}
                  onFieldChange={handleFieldChange}
                />
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    </div>
  );
};

export default TourSix;
