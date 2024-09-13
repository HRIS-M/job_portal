package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.*;
import com.hris.HRIS_job_portal.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/v2/batch")
public class BatchController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmpContactService empContactService;

    @Autowired
    private EmpEducationService empEducationService;

    @Autowired
    private EmpSkillsService empSkillsService;

    @Autowired
    private EmpExperiencesService empExperiencesService;

    @GetMapping("/getEmployee/{id}")
    public Map<String, Object> getEmployee(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        response.put("employee", employeeService.getEmployee(id));
        response.put("empContact", empContactService.getEmpContactByEmployeeId(id));
        response.put("empEducation", empEducationService.getEmpEducationByEmployeeId(id));
        response.put("empSkills", empSkillsService.getEmpSkillsByEmployeeId(id));
        response.put("empExperiences", empExperiencesService.getEmpExperiencesByEmployeeId(id));
        return response;
    }

    @GetMapping("/async/getEmployee/{id}")
    public CompletableFuture<Map<String, Object>> getEmployeeAsync(@PathVariable String id) {
        CompletableFuture<EmployeeModel> employeeFuture = employeeService.getEmployeeByIdAsync(id);
        CompletableFuture<List<EmpContactModel>> contactFuture = empContactService.getEmpContactByEmployeeIdAsync(id);
        CompletableFuture<List<EmpEducationModel>> educationFuture = empEducationService.getEmpEducationByEmployeeIdAsync(id);
        CompletableFuture<List<EmpSkillsModel>> skillsFuture = empSkillsService.getEmpSkillsByEmployeeIdAsync(id);
        CompletableFuture<List<EmpExperiencesModel>> experiencesFuture = empExperiencesService.getEmpExperiencesByEmployeeIdAsync(id);

        // Wait for all async calls to complete
        return CompletableFuture.allOf(employeeFuture, contactFuture, educationFuture, skillsFuture, experiencesFuture)
                .thenApply(v -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("employee", employeeFuture.join());
                    response.put("empContact", contactFuture.join());
                    response.put("empEducation", educationFuture.join());
                    response.put("empSkills", skillsFuture.join());
                    response.put("empExperiences", experiencesFuture.join());
                    return response;
                });
    }

}