package com.lagrimas.lab_7;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
    private final InvoiceService svc;
    private final InvoiceRepository repo;

    public InvoiceController(InvoiceService svc, InvoiceRepository repo) {
        this.svc = svc;
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Map<String, Object> body) {
        Long customerId = Long.valueOf(body.get("customerId").toString());
        List<?> pIdsRaw = (List<?>) body.get("productIds");
        List<Long> productIds = pIdsRaw.stream().map(o -> Long.valueOf(o.toString())).collect(Collectors.toList());
        Invoice invoice = svc.createInvoice(customerId, productIds);
        return ResponseEntity.ok(invoice);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
