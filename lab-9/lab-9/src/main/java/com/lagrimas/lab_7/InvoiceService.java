package com.lagrimas.lab_7;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepo;
    private final CustomerRepository customerRepo;
    private final ProductRepository productRepo;

    public InvoiceService(InvoiceRepository invoiceRepo,
                          CustomerRepository customerRepo,
                          ProductRepository productRepo) {
        this.invoiceRepo = invoiceRepo;
        this.customerRepo = customerRepo;
        this.productRepo = productRepo;
    }

    @Transactional
    public Invoice createInvoice(Long customerId, List<Long> productIds) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Set<Product> products = new HashSet<>(productRepo.findAllById(productIds));
        Invoice invoice = new Invoice();
        invoice.setCustomer(customer);
        invoice.setProducts(products);
        return invoiceRepo.save(invoice);
    }
}
