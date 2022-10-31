package com.example.dbapp.controller;

import com.example.dbapp.entity.Manager;
import com.example.dbapp.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes("manager")
public class RegisterController {

    @ModelAttribute("manager")
    public Manager manager() {
        return new Manager();
    }

    @Autowired
    private ManagerService managerService;

    @GetMapping("/register")
    public String showRegister() {
        return "pages-register";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute("manager") Manager manager) {
        return managerService.validateRegister(manager);
    }

}
