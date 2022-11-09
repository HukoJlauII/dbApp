package com.example.dbapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CommercialInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "commercial_invoice_id", nullable = false)
    private Long commercialInvoiceId;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate date;

    @OneToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @OneToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne
    @JoinColumn(name = "manager_id")
    private Manager manager;

    public CommercialInvoice(LocalDate date, Warehouse warehouse, Customer customer, Product product, Manager manager) {
        this.date = date;
        this.warehouse = warehouse;
        this.customer = customer;
        this.product = product;
        this.manager = manager;
    }
}
