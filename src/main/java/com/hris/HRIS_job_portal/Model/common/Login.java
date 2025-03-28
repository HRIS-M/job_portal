package com.hris.HRIS_job_portal.Model.common;

import com.hris.HRIS_job_portal.DTO.common.LoginMetaDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter

@Document(collection = "portal_logins")
public class Login {
    @Id
    private String id;
    private String userId;
    private List<String> loginDates;
    private List<LoginMetaDTO> metaData;
}
