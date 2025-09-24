import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  Button,
  TextField,
  ButtonGroup,
  FormLabel,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Edit, Group, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface Alarma {
  id: number;
  nombre: string;
  hora: string;
  periodicidad: string;
  equipo: string;
}

export default function EditAlarm() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [alarm, setAlarm] = useState<Alarma>({} as Alarma);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [equipo, setEquipo] = useState<string>("");

  function parseDays(text: string): string[] {
    const normalized = text.toLowerCase().trim();

    const dayMap: Record<string, string> = {
      "lunes": "lun",
      "martes": "mar",
      "miércoles": "mie",
      "miercoles": "mie",
      "jueves": "jue",
      "viernes": "vie",
      "sábado": "sab",
      "sabado": "sab",
      "domingo": "dom",
    };

    if (normalized.includes("todos los dias") || normalized.includes("todos los días")) {
      return Object.values(dayMap);
    }

    const result: string[] = [];
    for (const [day, code] of Object.entries(dayMap)) {
      if (normalized.includes(day)) {
        result.push(code);
      }
    }

    return result;
  }

  dayjs.extend(customParseFormat);

  function parseTime(input: string) {
    const normalized = input
      .trim()
      .replace(/\s*(am|pm)$/i, (_, p1) => " " + p1.toUpperCase());

    const parsed = dayjs(normalized, ["h:mm A", "hh:mm A"], true);
    return parsed.isValid() ? parsed : null;
  }



  useEffect(() => {
    const alarm = JSON.parse(localStorage.getItem("alarm") || "{}") as Alarma;
    setAlarm(alarm);
    setSelectedDays(parseDays(alarm.periodicidad));
    setEquipo(alarm.equipo);

    const time = parseTime(alarm.hora);

    if (time) {
      setTime(time);
    }
  }, []);

  const days = [
    { id: "lun", label: "LUN" },
    { id: "mar", label: "MAR" },
    { id: "mie", label: "MIÉ" },
    { id: "jue", label: "JUE" },
    { id: "vie", label: "VIE" },
    { id: "sab", label: "SÁB" },
    { id: "dom", label: "DOM" },
  ];

  const toggleDay = (dayId: string) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar selectedItem="alarmas" />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Breadcrumbs maxItems={3}>
              <Home sx={{ mb: -0.35 }} fontSize="inherit" />

              <Link
                href="/dashboard"
                sx={{ textDecoration: "none", color: "black" }}
              >
                Alarmas
              </Link>
              <Typography color="text.primary">
                <Edit sx={{ mb: -0.35, mr: 1 }} fontSize="inherit" />
                Editar Alarma
              </Typography>
            </Breadcrumbs>
          </Box>

          <Typography variant="h4">Editar Alarma</Typography>

          <Divider sx={{ marginTop: "8px", marginBottom: "32px" }} />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "681px",
            gap: 2,
            borderRadius: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              width: 600,
              p: 2,
            }}
          >
            <TextField label="Nombre" variant="outlined" value={alarm.nombre} />

            <TextField
              label="Hora"
              type="time"
              variant="outlined"
              value={time?.format("HH:mm")}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel id="days-label">Periodicidad</FormLabel>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                {days.map((day) => (
                  <Button
                    key={day.id}
                    onClick={() => toggleDay(day.id)}
                    sx={{
                      backgroundColor: selectedDays.includes(day.id)
                        ? "primary.main"
                        : "transparent",
                      color: selectedDays.includes(day.id)
                        ? "white"
                        : "primary.main",
                      "&:hover": {
                        backgroundColor: selectedDays.includes(day.id)
                          ? "primary.dark"
                          : "primary.light",
                        color: selectedDays.includes(day.id)
                          ? "white"
                          : "primary.dark",
                      },
                    }}
                  >
                    {day.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>

            <TextField
              label="Fecha de inicio"
              type="date"
              value="2025-06-15"
              variant="outlined"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              select
              label="Equipo"
              variant="outlined"
              value={equipo}
              onChange={(e) =>
                setAlarm((prev: any) => ({
                  ...prev,
                  equipo: e.target.value,
                }))
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Group />
                    </InputAdornment>
                  ),
                },
              }}
            >
              <MenuItem value="">Selecciona un equipo</MenuItem>
              {alarm.equipo && <MenuItem value={alarm.equipo}>{alarm.equipo}</MenuItem>}
              <MenuItem value="equipo1">Equipo 1</MenuItem>
              <MenuItem value="equipo2">Equipo 2</MenuItem>
              <MenuItem value="equipo3">Equipo 3</MenuItem>
            </TextField>

            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <Button type="submit" variant="contained" sx={{ height: 36 }}>
                Editar Alarma
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
