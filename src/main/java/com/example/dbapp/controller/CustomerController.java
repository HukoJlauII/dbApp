package com.example.dbapp.controller;

import com.example.dbapp.entity.Customer;
import com.example.dbapp.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;


    @GetMapping(path = "")
    Page<Customer> showTableContent(@RequestParam(value = "page",required = false) Optional<Integer> page) {
        if (page.isPresent()) {
            return customerRepository.findAllBy(PageRequest.of(page.get(), 10));
        }
        else {
            return customerRepository.findAllBy(PageRequest.of(0, 10));
        }
    }

    @GetMapping(path = "/search", params = {"search"})
    Page<Customer> showCustomersByNameOrSurname(@RequestParam("page") Optional<Integer> page, @RequestParam("search") String searchLine) {
        if (page.isPresent()) {
            return customerRepository.findCustomersWithSearch(searchLine, PageRequest.of(page.get(), 10));
        }
        else {
            return customerRepository.findCustomersWithSearch(searchLine, PageRequest.of(0, 10));
        }
    }
    @GetMapping("/all")
    public List<Customer> showAllCustomers() {
        return customerRepository.findAll();
    }

    @PostMapping("")
    public Customer createCustomer(@RequestBody Customer customer) {

        return customerRepository.save(customer);
    }

    @DeleteMapping(path = "/{id}")
    public boolean deleteByCustomerId(@PathVariable Long id) {
        if (customerRepository.findCustomerByCustomerId(id) != null) {
            customerRepository.deleteByCustomerId(id);
            return true;
        } else {
            return false;
        }
    }

    @PatchMapping(value = "/{id}")
    public boolean updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        if (customerRepository.findCustomerByCustomerId(id) != null) {
            customerRepository.updateNameAndSurnameAndDiscountAndCityByCustomerId(customer.getName(), customer.getSurname(),customer.getDiscount(),customer.getCity(), id);
            return true;
        } else {
            return false;
        }
    }
}
