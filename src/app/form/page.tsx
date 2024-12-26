"use client";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

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
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    birthDate: "",
    tel: "",
    img: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setFormData({
      ...formData,
      tanggalLahir: date?.format("YYYY-MM-DD") || "",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, img: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.age || !formData.tel) {
      alert("Please fill out all required fields.");
      return;
    }

    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  const card = (
    <>
      <CardContent>
        <TextField
          fullWidth
          id="name"
          label="Nama Lengkap"
          variant="filled"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          id="age"
          label="Umur"
          variant="filled"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Tanggal Lahir"
              value={formData.birthDate || null}
              onChange={handleDateChange}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
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
          variant="filled"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          required
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </CardActions>
    </>
  );

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
          </Box>
        </div>
      </main>
    </div>
  );
}
