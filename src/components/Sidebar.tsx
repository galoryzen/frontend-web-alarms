import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { AccessAlarm, Group, CalendarMonth } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  variant?: "permanent" | "persistent" | "temporary";
  selectedItem?: string;
  onItemSelect?: (item: string) => void;
}

const sidebarItems = [
  { id: "alarmas", label: "Alarmas", icon: AccessAlarm },
  { id: "equipos", label: "Equipos", icon: Group },
  { id: "calendario", label: "Calendario", icon: CalendarMonth },
];

export default function Sidebar({
  open = true,
  onClose,
  variant = "permanent",
  onItemSelect,
}: SidebarProps) {
  const drawerWidth = 240;
  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
    onItemSelect?.(itemId);

    if (itemId === "alarmas") {
      navigate("/dashboard");
    }
  };

  const sidebarContent = (
    <Box sx={{ width: drawerWidth, height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          paddingTop: "24px",
          marginBottom: "32px",
          marginLeft: "32px",
        }}
      >
        <Box
          component="img"
          src="/logosidecrop.png"
          alt="Alivio"
          sx={{ height: 45 }}
        />
      </Box>

      <List sx={{ pt: 1 }}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.id)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "text.secondary",
                    minWidth: 36,
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.9rem",
                    fontWeight: 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          border: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
}
