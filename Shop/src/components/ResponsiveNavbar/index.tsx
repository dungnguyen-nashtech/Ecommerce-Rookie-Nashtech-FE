import { AppBar, Box, Button, IconButton, Menu, MenuItem, MenuList, Toolbar, Typography } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, MouseEvent } from "react";

export default function ResponsiveNavbar() {
  const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
  const openMenu = (event: MouseEvent<HTMLElement>) => setAnchorNav(event.currentTarget);
  const closeMenu = () => setAnchorNav(null);
  return (
    <AppBar sx={{ display: "block" }}>
      <Toolbar>
        <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"logo"}
                    sx={{ display: { xs: "none", md: "flex" } }}>
          <LocalLibraryIcon />
        </IconButton>
        <Typography variant={"h6"} component={"div"}
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          Responsive Navbar
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button sx={{ margin: "0 1rem" }} color={"inherit"}>Home1</Button>
          <Button sx={{ margin: "0 1rem" }} color={"inherit"}>Home2</Button>
          <Button sx={{ margin: "0 1rem" }} color={"inherit"}>Home3</Button>
          <Button sx={{ margin: "0 1rem" }} color={"inherit"}>Home4</Button>
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton size={"large"} edge={"start"} color={"inherit"}
                      onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            onClose={closeMenu}
            sx={{ display: { xs: "flex", md: "none" }, marginTop: "2.5rem" }}
            open={Boolean(anchorNav)}>
            <MenuList sx={{ padding: "2rem" }}>
              <MenuItem> Home1 </MenuItem>
              <MenuItem> Home2 </MenuItem>
              <MenuItem> Home3 </MenuItem>
              <MenuItem> Home4 </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <IconButton size={"large"} edge={"start"} color={"inherit"} aria-label={"logo"}
                    sx={{ display: { xs: "flex", md: "none" } }}>
          <LocalLibraryIcon />
        </IconButton>
        <Typography variant={"h6"} component={"div"}
                    sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          Responsive Navbar
        </Typography>
      </Toolbar>
    </AppBar>
  );
}