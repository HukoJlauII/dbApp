package com.example.dbapp.controller;

import com.example.dbapp.entity.Manager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class TableController {

    @GetMapping("/{table}")
    public String showTable(@PathVariable String table, Model model)
    {
        System.out.println(table);
        model.addAttribute("user", (Manager)SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        model.addAttribute("table",table);
        return "index";
    }


}
