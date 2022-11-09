package com.example.dbapp.controller;

import com.example.dbapp.entity.Manager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping(value = {"/", "/index"})
    public String showMain(Model model) {
        model.addAttribute("user", (Manager) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        model.addAttribute("table","main");
        return "index";
    }


}
