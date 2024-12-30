package com.hris.HRIS_job_portal.Controller.payment;

import com.hris.HRIS_job_portal.Model.payment.InvoicesModel;
import com.hris.HRIS_job_portal.Service.payment.InvoicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v2/invoices")
public class InvoicesController {

    @Autowired
    private InvoicesService invoicesService;

    @GetMapping("/get/{companyId}")
    public ResponseEntity<List<InvoicesModel>> getInvoices(@PathVariable String companyId) {
        List<InvoicesModel> invoices = invoicesService.getInvoicesByCompanyId(companyId);
        return ResponseEntity.ok(invoices);
    }
}