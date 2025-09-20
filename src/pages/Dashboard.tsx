import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  Divider,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { DataGrid, GridColDef, Toolbar } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "nombre", headerName: "Nombre", flex: 1, sortable: true },
  { field: "hora", headerName: "Hora", flex: 1, sortable: true },
  {
    field: "periodicidad",
    headerName: "Periodicidad",
    flex: 1,
    sortable: true,
  },
  {
    field: "equipo",
    headerName: "Equipo",
    flex: 1,
    sortable: true,
    renderCell: (params) =>
      params.value && (
        <Chip
          label={params.value}
          sx={{
            bgcolor: "rgb(39, 99, 138, 0.3)",
          }}
        />
      ),
  },
];

function customToolbar() {
  const navigate = useNavigate();

  return (
    <Toolbar>
      <Box
        sx={{
          justifyContent: "end",
          px: 2,
          py: 1,
          bgcolor: "background.paper",
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate("/add-alarm")}

          sx={{
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            textTransform: "none",
            fontWeight: 600,
            px: 3,
          }}
        >
          AGREGAR
        </Button>
      </Box>
    </Toolbar>
  );
}

const rows = [
  {
    id: 1,
    nombre: "Clase",
    hora: "9:10 AM",
    periodicidad: "Lunes, Martes y Miercoles",
    equipo: "Surgery",
  },
  {
    id: 2,
    nombre: "Gimnasio",
    hora: "12:30 PM",
    periodicidad: "Todos los dias",
  },
  {
    id: 3,
    nombre: "Dormir",
    hora: "12:00 AM",
    periodicidad: "Viernes",
  },
];

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar selectedItem="alarmas" />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs maxItems={2} sx={{ mb: 2 }}>
            <Typography></Typography>
            <Link
              color="inherit"
              href="#"
              sx={{ textDecoration: "none" }}
            ></Link>
            <Typography color="text.primary">Alarmas</Typography>
          </Breadcrumbs>

          <Typography variant="h4">Alarmas</Typography>

          <Divider sx={{ marginTop: "8px", marginBottom: "32px" }} />
        </Box>

        <Box
          sx={{
            borderRadius: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              border: "none",
            }}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: customToolbar }}
            showToolbar
          />
        </Box>
      </Box>
    </Box>
  );
}
