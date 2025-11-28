package com.lagrimas.lab_7.service;

import com.lagrimas.lab_7.model.Product;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    private final Map<Long, Product> products = new ConcurrentHashMap<>();
    private final AtomicLong idCounter = new AtomicLong(0);

    @PostConstruct
    public void init() {
        create(new Product(null, "Laptop Pro", 1299.99));
        create(new Product(null, "Wireless Mouse", 29.99));
        create(new Product(null, "Mechanical Keyboard", 89.99));
    }

    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(products.get(id));
    }

    public Product create(Product product) {
        Long id = idCounter.incrementAndGet();
        Product saved = new Product(id, product.getName(), product.getPrice());
        products.put(id, saved);
        return saved;
    }

    public Optional<Product> update(Long id, Product product) {
        Product existing = products.get(id);
        if (existing == null) {
            return Optional.empty();
        }
        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        return Optional.of(existing);
    }

    public boolean delete(Long id) {
        return products.remove(id) != null;
    }
}