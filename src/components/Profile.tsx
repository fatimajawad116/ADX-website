import {
  Button,
  Center,
  Flex,
  Loader,
  Modal,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const PROFILE_ENDPOINT = "/profile/info";
const PROFILE_URL = `${
  BASE_URL.endsWith("/api") ? BASE_URL : BASE_URL + "/api"
}${PROFILE_ENDPOINT}`;
interface BackendProfileResponse {
  account_id: string;
  full_name: string;
  email_address: string;
  phone_number: string;
  age: {
    year: number;
    month: number;
    day: number;
    age_in_years: number;
  };
  gender: "Male" | "Female";
}
interface FormState {
  accountId: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  ageYear: string;
  ageMonth: string;
  ageDay: string;
  gender: "Male" | "Female";
}
interface ProfileProps {
  opened: boolean;
  onClose: () => void;
  account_id: string;
}
async function fetchProfile(): Promise<BackendProfileResponse> {
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    throw new Error("Authentication token not found. Please log in.");
  }
  const response = await fetch(PROFILE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to fetch Transactions" }));
    throw new Error(
      errorData.message ||
        `Failed to fetch Profile with Status: ${response.status}`
    );
  }
  console.log("responsssss", response);
  return response.json();
}

const commonTextInputStyles = {
  root: {
    width: "100%",
  },
  label: {
    color: "#CFCFCF",
    marginLeft: "10px",
    fontSize: "15px",
    fontWeight: 400,
    marginBottom: "8px",
  },
  input: {
    height: "35px",
    borderRadius: "12px",
    backgroundColor: "#0A1F44",
    borderColor: "#FF9B42",
    color: "#FFFFFF",
    paddingLeft: "15px",
  },
};
const ageInputStyles = {
  label: commonTextInputStyles.label,
  input: {
    ...commonTextInputStyles.input,
    width: "100%",
    textAlign: "center",
    "&::-webkit-inner-spin-button": { display: "none" },
    "&::-webkit-outer-spin-button": { display: "none" },
    "-moz-appearance": "textfield",
  } as const,
};

export default function Profile({ opened, onClose, account_id }: ProfileProps) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [formData, setFormData] = useState<FormState>({
    accountId: account_id,
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    ageYear: "",
    ageMonth: "",
    ageDay: "",
    gender: "Male",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading, error, refetch } = useQuery<
    BackendProfileResponse,
    Error
  >({
    queryKey: ["ProfileData"],
    queryFn: fetchProfile,
    enabled: opened,
  });
  const { t } = useTranslation();
  const updateFormDataFromData = (profileData: BackendProfileResponse) => {
    setFormData({
      accountId: profileData.account_id || "",
      fullName: profileData.full_name || "",
      emailAddress: profileData.email_address || "",
      phoneNumber: profileData.phone_number || "",
      ageYear: String(profileData.age?.year || "") || "",
      ageMonth: String(profileData.age?.month || "") || "",
      ageDay: String(profileData.age?.day || "") || "",
      gender: profileData.gender || "Male",
    });
  };

  useEffect(() => {
    if (data) {
      updateFormDataFromData(data);
    }
  }, [data, account_id]);

  const handleInputChange = (key: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const handleGenderChange = (gender: "Male" | "Female") => {
    if (isEditing) {
      setFormData((prev) => ({ ...prev, gender }));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (data) {
      updateFormDataFromData(data);
    }
  };

  const handleSave = async () => {
    if (isSaving) return;

    const updatePayload = {
      full_name: formData.fullName,
      phone: formData.phoneNumber,
      email: formData.emailAddress,
      gender: formData.gender,
      birth_year: Number(formData.ageYear),
      birth_month: Number(formData.ageMonth),
      birth_day: Number(formData.ageDay),
    };
    const authToken = localStorage.getItem("authToken");
    const UPDATE_URL = PROFILE_URL.replace("/info", "/update");

    setIsSaving(true);

    try {
      const response = await fetch(UPDATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to save changes" }));
        throw new Error(
          errorData.message ||
            `Failed to save changes with Status: ${response.status}`
        );
      }

      notifications.show({
        title: "Update Profile Successful",
        message:
          "You have been successfully updating information in to your account.",
        color: "green",
        icon: <IconCheck />,
        autoClose: 5000,
      });

      setIsEditing(false);
      refetch();
      console.log("Profile updated successfully!");
      // onClose();
    } catch (err) {
      console.error("Save error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      notifications.show({
        title: "Update Failed",
        message: `Failed to update data: ${errorMessage}`,
        color: "red",
        icon: <IconX />,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Modal
        opened={opened}
        onClose={onClose}
        styles={{
          content: {
            minWidth: "534px",
            backgroundColor: "#0A1F44",
            border: "2px solid #FF9B42",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "-6px 7px 4px 0px #FF9B42",
          },
        }}
      >
        <Center h="200px">
          <Loader size="lg" color="#FF9B42" />
        </Center>
      </Modal>
    );
  }
  if (error) {
    return (
      <Center h="70vh">
        <Text c={"red"} size="lg">
          Error fetching profile: {error.message}
        </Text>
      </Center>
    );
  }

  return (
    <Modal
      w={"534px"}
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      closeOnClickOutside={false}
      overlayProps={{
        backgroundOpacity: 0.85,
        blur: 1,
      }}
      styles={{
        content: {
          minWidth: isMobile ? "90vw" : "534px",
          maxWidth: isMobile ? "90vw" : "600px",
          width: "100%",
          height: isMobile ? "auto" : "100%",
          maxHeight: isMobile ? "90vh" : "900px",
          backgroundColor: "#0A1F44",
          border: "2px solid #FF9B42",
          borderRadius: "20px",
          padding: isMobile ? "20px 15px" : "20px 30px",
          boxShadow: "-6px 7px 4px #FF9B42",
          overflowY: "auto",
        },
        body: {
          paddingTop: "30px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        },
      }}
    >
      <Flex direction={"column"} gap={"25px"} w={"100%"}>
        <Flex direction={"column"} gap={"10px"} w={"100%"}>
          <Flex justify={"space-between"} align={"center"} px={"20px"}>
            <Text
              c={"#FFF"}
              fz={"20px"}
              fw={"600"}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {t("Personal Information")}
            </Text>
            <Flex gap="10px">
              {!isEditing ? (
                <>
                  <IconPencil
                    size={24}
                    stroke={1.5}
                    color="#FFF"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsEditing(true)}
                  />
                  <IconX
                    size={24}
                    stroke={1.5}
                    color="#FFF"
                    style={{ cursor: "pointer" }}
                    onClick={onClose}
                  />
                </>
              ) : (
                <>
                  {isSaving ? (
                    <Loader size="sm" color="#38A169" />
                  ) : (
                    <IconCheck
                      size={24}
                      stroke={1.5}
                      color="#FFF"
                      style={{ cursor: "pointer" }}
                      onClick={handleSave}
                    />
                  )}
                  <IconX
                    size={24}
                    stroke={1.5}
                    color="#FFF"
                    style={{ cursor: "pointer" }}
                    onClick={handleCancelEdit}
                  />
                </>
              )}
            </Flex>
          </Flex>
          <Flex h={"1px"} w={"100%"} bg={"#FF9B42"}></Flex>
        </Flex>
        <Flex direction={"column"} gap={"20px"} w={"100%"} px={"20px"}>
          <TextInput
            label={t("Account ID")}
            value={formData.accountId}
            readOnly
            disabled
            styles={commonTextInputStyles}
          />

          <TextInput
            label={t("Full name")}
            value={formData.fullName}
            onChange={(event) =>
              handleInputChange("fullName", event.currentTarget.value)
            }
            styles={commonTextInputStyles}
            readOnly={!isEditing}
            disabled={!isEditing || isSaving}
          />

          <TextInput
            label={t("Email Address")}
            type="email"
            value={formData.emailAddress}
            onChange={(event) =>
              handleInputChange("emailAddress", event.currentTarget.value)
            }
            styles={commonTextInputStyles}
            readOnly={!isEditing}
            disabled={!isEditing || isSaving}
          />

          <TextInput
            label={t("Phone Number")}
            type="tel"
            value={formData.phoneNumber}
            onChange={(event) =>
              handleInputChange("phoneNumber", event.currentTarget.value)
            }
            styles={commonTextInputStyles}
            readOnly={!isEditing}
            disabled={!isEditing || isSaving}
          />
          <Flex direction="column" gap="8px">
            <Text style={commonTextInputStyles.label}>{t("Age")}</Text>
            <Flex gap={"15px"} w={"100%"} justify={"space-between"}>
              <TextInput
                placeholder={t("year")}
                value={formData.ageYear}
                onChange={(event) =>
                  handleInputChange("ageYear", event.currentTarget.value)
                }
                type="number"
                styles={ageInputStyles}
                style={{ flex: 1 }}
                readOnly={!isEditing}
                disabled={!isEditing || isSaving}
              />
              <TextInput
                placeholder={t("month")}
                value={formData.ageMonth}
                onChange={(event) =>
                  handleInputChange("ageMonth", event.currentTarget.value)
                }
                type="number"
                styles={ageInputStyles}
                style={{ flex: 1 }}
                readOnly={!isEditing}
                disabled={!isEditing || isSaving}
              />
              <TextInput
                placeholder={t("day")}
                value={formData.ageDay}
                onChange={(event) =>
                  handleInputChange("ageDay", event.currentTarget.value)
                }
                type="number"
                styles={ageInputStyles}
                style={{ flex: 1 }}
                readOnly={!isEditing}
                disabled={!isEditing || isSaving}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" gap="8px">
          <Text style={commonTextInputStyles.label}>{t("Gender")}</Text>
          <Flex gap={"40px"} w={"100%"} justify={"space-between"}>
            <Button
              w={"194px"}
              h={"35px"}
              onClick={() => handleGenderChange("Male")}
              disabled={!isEditing || isSaving}
              style={{
                border: `1px solid ${
                  formData.gender === "Male" ? "#FFFFFF" : "#FF9B42"
                }`,
                backgroundColor:
                  formData.gender === "Male" ? "#FFFFFF" : "#0A1F44",
                color: formData.gender === "Male" ? "#0A1F44" : "#FFFFFF",
                fontWeight: 400,
                fontSize: "15px",
                borderRadius: "12px",
                flex: 1,
                cursor: isEditing && !isSaving ? "pointer" : "not-allowed",
                opacity:
                  (!isEditing && formData.gender !== "Male") || isSaving
                    ? 0.6
                    : 1,
              }}
            >
              {t("Male")}
            </Button>
            <Button
              w={"194px"}
              h={"35px"}
              onClick={() => handleGenderChange("Female")}
              disabled={!isEditing || isSaving}
              style={{
                border: `1px solid ${
                  formData.gender === "Female" ? "#FFFFFF" : "#FF9B42"
                }`,
                backgroundColor:
                  formData.gender === "Female" ? "#FFFFFF" : "#0A1F44",
                color: formData.gender === "Female" ? "#0A1F44" : "#FFFFFF",
                fontWeight: 400,
                borderRadius: "12px",
                fontSize: "15px",
                flex: 1,
                cursor: isEditing && !isSaving ? "pointer" : "not-allowed",
                opacity:
                  (!isEditing && formData.gender !== "Female") || isSaving
                    ? 0.6
                    : 1,
              }}
            >
              {t("Female")}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
}
