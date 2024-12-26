"use client";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useGlobalState } from "@/utils/providers/GlobalStateContext";
import { useRouter } from "next/navigation";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Form() {
  const { setGlobalFormData } = useGlobalState();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    birthDate: null as Dayjs | null,
    tel: "",
    img: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const today = dayjs();
      const years = today.diff(date, "year");
      setFormData({ ...formData, birthDate: date, age: years.toString() });
    } else {
      setFormData({ ...formData, birthDate: null, age: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, img: e.target.files[0] });
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name) errors.push("nama lengkap tidak boleh kosong.");
    if (formData.name && formData.name.length < 3)
      errors.push("nama lengkap harus memiliki setidaknya 3 karakter.");
    if (/[^a-zA-Z\s]/.test(formData.name))
      errors.push("nama lengkap hanya boleh mengandung huruf dan spasi.");

    if (!formData.age) errors.push("umur tidak boleh kosong.");
    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age <= 0)
      errors.push("umur harus berupa angka positif yang valid.");

    if (!formData.birthDate) errors.push("tanggal lahir tidak boleh kosong.");

    if (!formData.tel) errors.push("nomor telepon tidak boleh kosong.");
    if (formData.tel && formData.tel.length < 10)
      errors.push("nomor telepon harus memiliki setidaknya 10 digit.");

    if (!formData.img) errors.push("foto profil tidak boleh kosong.");
    if (formData.img && formData.img.size > 5 * 1024 * 1024)
      errors.push("ukuran file foto tidak boleh lebih dari 5 MB.");

    return errors;
  };

  const handleReset = () => {
    setFormData({
      name: "",
      age: "",
      birthDate: null as Dayjs | null,
      tel: "",
      img: null as File | null,
    });
  };

  const handleSubmit = () => {
    const errors = validateForm();

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const formattedData = {
      ...formData,
      birthDate: formData.birthDate?.format("YYYY-MM-DD") || "",
    };

    setGlobalFormData(formattedData);
    console.log("form data submitted, local state:", formattedData);
    alert("form berhasil disubmit!");
    handleReset();
    router.push("/about");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: 400,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
      >
        <CardContent
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            id="name"
            label="Nama Lengkap"
            variant="outlined"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                className="w-full"
                label="Tanggal Lahir"
                value={formData.birthDate || null}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            fullWidth
            id="age"
            label="Umur"
            variant="filled"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            disabled
          />
          <Typography variant="body2" color="info">
            * Pilih tanggal lahir untuk menghitung umur
          </Typography>

          <Button
            component="label"
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            sx={{
              display: "flex",
              justifyContent: "center",
              textTransform: "none",
              bgcolor: "#275fa4",
            }}
          >
            {formData.img ? formData.img.name : "Unggah Foto Profil"}
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          <TextField
            fullWidth
            id="tel"
            label="Nomor Telepon"
            variant="outlined"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
          />
        </CardContent>
        <CardActions sx={{ p: 3, justifyContent: "center" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#53adbe",
            }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleReset}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#616264",
            }}
          >
            Reset
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
