package com.example.dbapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class PurchaseInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "purchase_invoice_id", nullable = false)
    private Long purchaseInvoiceId;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime dateTime;

    @OneToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @OneToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne
    @JoinColumn(name = "manager_id")
    private Manager manager;

    public PurchaseInvoice(LocalDateTime dateTime, Warehouse warehouse, Supplier supplier, Product product, Manager manager) {
        this.dateTime = dateTime;
        this.warehouse = warehouse;
        this.supplier = supplier;
        this.product = product;
        this.manager = manager;
    }
}
