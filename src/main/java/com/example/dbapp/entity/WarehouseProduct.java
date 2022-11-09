package com.example.dbapp.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class WarehouseProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "warehouse_product_id", nullable = false)
    private Long warehouseProductId;

    private int quantity;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    public WarehouseProduct(int quantity, Product product, Warehouse warehouse) {
        this.quantity = quantity;
        this.product = product;
        this.warehouse = warehouse;
    }
}
