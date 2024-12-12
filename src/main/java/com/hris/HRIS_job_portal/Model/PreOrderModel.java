package com.hris.HRIS_job_portal.Model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection = "portal_preorder")
public class PreOrderModel {
    @Id
    private String id;
    private String name;
    private String email;
    private String product;
    private String date;
}
