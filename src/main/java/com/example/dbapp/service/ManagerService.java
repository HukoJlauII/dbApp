package com.example.dbapp.service;

import com.example.dbapp.entity.Manager;
import com.example.dbapp.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ManagerService implements UserDetailsService {

    @Autowired
    private ManagerRepository managerRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Page<Manager> findAllBy(int page){
        return managerRepo.findAllBy(PageRequest.of(page,10));
    }

    public Page<Manager> findManagersByNameLikeOrSurnameLike(String searchLine, int page){
        return managerRepo.findManagersWithSearch(searchLine,PageRequest.of(page,10));
    }
    public void updateNameAndSurnameAndEmailAndTelephoneByManagerId(String name, String surname, String email, String telephone, Long managerId){
        managerRepo.updateNameAndSurnameAndEmailAndTelephoneByManagerId(name, surname, email, telephone, managerId);
    }

    public Manager getAuth()
    {
        Manager manager=(Manager) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return managerRepo.findManagersByManagerId(manager.getManagerId());
    }

    public void deleteByManagerId(Long managerId){
         managerRepo.deleteByManagerId(managerId);
    }

    public Manager save(Manager manager)
    {
        return managerRepo.save(manager);
    }

    public Manager findManagerByEmail(String email)
    {
        return managerRepo.findManagerByEmail(email);
    }
    public Manager findManagerByManagerId(Long managerId)
    {
        return managerRepo.findManagersByManagerId(managerId);
    }
    public void registerManager(Manager manager)
    {
        Manager managerFromDB=findManagerByEmail(manager.getEmail());
        if (managerFromDB!=null)
        {
            return;
        }
        manager.setPassword(passwordEncoder.encode(manager.getPassword()));
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
