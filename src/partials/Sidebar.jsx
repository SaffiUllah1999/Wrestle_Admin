import React from "react";
import logoImage from "../assets/logo.png";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <img
              src={logoImage}
              alt="Logo"
              className="w-20 h-22" // Adjust size as necessary
            />
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact activeClassName="activeClicked" to="/events">
              <CDBSidebarMenuItem icon="table">Events</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact activeClassName="activeClicked" to="/news">
              <CDBSidebarMenuItem icon="user">News</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Wrestlers
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Blogs
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          ></div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
