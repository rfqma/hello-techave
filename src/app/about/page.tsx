"use client";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useGlobalState } from "@/utils/providers/GlobalStateContext";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";

export default function Form() {
  const { globalFormData } = useGlobalState();

  const isGlobalFormDataEmpty =
    globalFormData.name === "" ||
    globalFormData.age === "" ||
    globalFormData.birthDate === "" ||
    globalFormData.tel === "" ||
    globalFormData.img === null;

  console.log(isGlobalFormDataEmpty);

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
        {isGlobalFormDataEmpty ? (
          <>
            <CardContent
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Alert severity="error">
                global state masih kosong, form belum diisi!
              </Alert>
            </CardContent>
          </>
        ) : (
          <>
            <CardContent
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <div className="flex flex-row items-center">
                <Avatar
                  alt={globalFormData.name}
                  src={
                    globalFormData.img
                      ? URL.createObjectURL(globalFormData.img)
                      : undefined
                  }
                />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {globalFormData.name}
                </Typography>
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Tanggal Lahir"
                    value={dayjs(globalFormData.birthDate)}
                    disabled
                  />
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                fullWidth
                id="age"
                label="Umur"
                variant="outlined"
                name="age"
                type="number"
                value={globalFormData.age}
                disabled
              />

              <TextField
                fullWidth
                id="tel"
                label="Nomor Telepon"
                variant="outlined"
                name="tel"
                value={globalFormData.tel}
                disabled
              />
            </CardContent>
            <CardActions sx={{ p: 3, justifyContent: "center" }}>
              {/*  */}
            </CardActions>
          </>
        )}
      </Card>
    </Box>
  );
}
