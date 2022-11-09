package com.example.dbapp.controller;

import com.example.dbapp.entity.Manager;
import com.example.dbapp.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/managers")
public class ManagerController {

    @Autowired
    private ManagerService managerService;


    @GetMapping(path = "")
    Page<Manager> showTableContent(@RequestParam(value = "page",required = false)Optional<Integer> page) {
        if (page.isPresent()){
            return managerService.findAllBy(page.get());
        }else {
            return managerService.findAllBy(0);
        }
    }

    @GetMapping(path = "/search")
    Page<Manager> showManagersByNameOrSurname( @RequestParam(value = "page",required = false) Optional<Integer> page,@RequestParam("search") String searchLine) {
        if (page.isPresent()) {
            return managerService.findManagersByNameLikeOrSurnameLike(searchLine, page.get());
        }else
        {
            Page<Manager> managers=managerService.findManagersByNameLikeOrSurnameLike(searchLine, 0);
            return managerService.findManagersByNameLikeOrSurnameLike(searchLine, 0);
        }
    }


    @DeleteMapping(path = "/{id}")
    public boolean deleteByManagerId(@PathVariable Long id)
    {
        if (managerService.findManagerByManagerId(id)!=null)
        {
            managerService.deleteByManagerId(id);
            return true;
        }else
        {
            return false;
        }
    }

    @PatchMapping(value = "/{id}")
    public boolean updateManager(@PathVariable Long id,@RequestBody Manager manager)
    {
        if (managerService.findManagerByManagerId(id)!=null)
        {
            managerService.updateNameAndSurnameAndEmailAndTelephoneByManagerId(manager.getName(), manager.getSurname(), manager.getEmail(), manager.getTelephone(), id);
            return true;
        }else
        {
            return false;
        }
    }
}
