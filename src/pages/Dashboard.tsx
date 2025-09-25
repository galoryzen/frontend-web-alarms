import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  DataGrid,
  GridColDef,
  Toolbar,
  GridRowSelectionModel,
  GridRowModel,
} from "@mui/x-data-grid";
import { useState } from "react";

interface CustomToolbarProps {
  onDelete: () => void;
  rows: GridRowModel[];
  selectedRows: GridRowSelectionModel;
}

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

function customToolbar({ selectedRows, onDelete, rows }: CustomToolbarProps) {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete();
  };

  const handleAddOrEdit = () => {
    if (selectedRows?.ids?.size === 1) {
      const selectedId = Array.from(selectedRows.ids)[0];
      const alarm = rows.find((row) => row.id === selectedId);
      localStorage.setItem("alarm", JSON.stringify(alarm));
      navigate("/edit-alarm");
    } else {
      navigate("/add-alarm");
    }
  };

  const getDisableEdit = () => {
    if (selectedRows?.ids?.size >= 1) {
      return selectedRows?.ids?.size > 1;
    }

    return false;
  };

  const getLabel = () => {
    if (selectedRows?.ids?.size >= 1) {
      return "EDITAR";
    }

    return "AGREGAR";
  };

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
        {selectedRows?.ids?.size > 0 && (
          <Button
            variant="outlined"
            onClick={() => handleDelete()}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              mr: 2,
            }}
          >
            {"BORRAR"}
          </Button>
        )}
        <Button
          disabled={getDisableEdit()}
          variant="contained"
          onClick={handleAddOrEdit}
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
          {getLabel()}
        </Button>
      </Box>
    </Toolbar>
  );
}

export default function Dashboard() {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>(
    [] as unknown as GridRowSelectionModel
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [rows, setRows] = useState<GridRowModel[]>([
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
  ]);

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
            onRowSelectionModelChange={(selection) => {
              setSelectedRows(selection);
            }}
            slots={{
              toolbar: () =>
                customToolbar({
                  selectedRows: selectedRows,
                  rows: rows,
                  onDelete: () => {
                    setSnackbarOpen(true);
                    setRows((prevRows) =>
                      prevRows.filter((row) => !selectedRows?.ids?.has(row.id))
                    );
                  },
                }),
            }}
            showToolbar
          />
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {selectedRows?.ids?.size == 1
            ? "Alarma eliminada correctamente"
            : "Alarmas eliminadas correctamente"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
