package com.example.dbapp.service;

import com.example.dbapp.entity.Manager;
import com.example.dbapp.repository.ManagerRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ManagerService implements UserDetailsService {

    @Autowired
    private ManagerRepo managerRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public Manager save(Manager manager)
    {
        return managerRepo.save(manager);
    }

    public Manager findManagerByEmail(String email)
    {
        return managerRepo.findManagerByEmail(email);
    }

    public void registerManager(Manager manager)
    {
        Manager managerFromDB=findManagerByEmail(manager.getEmail());
        if (managerFromDB!=null)
        {
            return;
        }
        manager.setPassword(bCryptPasswordEncoder.encode(manager.getPassword()));
        save(manager);
    }

    
    public String validateRegister(Manager manager) {
        
        if (findManagerByEmail(manager.getEmail()) != null) {
            return "/register";
        }
        try {
            registerManager(manager);
            return "redirect:/login";
        } catch (Exception e) {
            return "/register";
        }
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Manager manager = findManagerByEmail(username);
        if (manager == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return manager;
    }
}
