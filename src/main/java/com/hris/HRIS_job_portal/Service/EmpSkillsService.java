package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.DTO.EmpSkillsDTO;
import com.hris.HRIS_job_portal.Model.EmpSkillsModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmpSkillsRepository;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class EmpSkillsService {

    @Autowired
    private EmpSkillsRepository empSkillsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmpSkillsModel> getEmpSkillsByEmployeeId(String employeeId) {
        return empSkillsRepository.findByEmployeeId(employeeId);
    }

    public EmpSkillsModel addEmpSkills(EmpSkillsModel empSkills) {
        // Find all EmpSkillsModel records by employeeId
        List<EmpSkillsModel> empSkillsList = empSkillsRepository.findByEmployeeId(empSkills.getEmployeeId());

        EmpSkillsModel empSkillsModel;

        if (!empSkillsList.isEmpty()) {
            // Use the first EmpSkillsModel if it exists (assuming only one entry should exist)
            empSkillsModel = empSkillsList.get(0);

            List<EmpSkillsDTO> skills = empSkillsModel.getSkills();
            if (skills == null) {
                skills = new ArrayList<>();
            }

            // Append the new skills from the incoming empSkills object
            skills.addAll(empSkills.getSkills());

            empSkillsModel.setSkills(skills);
        } else {
            // If no skills exist, create a new EmpSkillsModel entry
            empSkillsModel = empSkillsRepository.save(empSkills);
        }

        // Save the updated EmpSkillsModel to the repository
        empSkillsRepository.save(empSkillsModel);

        // Now update the EmployeeModel to reference the empSkillsModel ID (if needed)
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empSkills.getEmployeeId());
        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setSkills(empSkillsModel.getId());

            // Update the profileCompleted map
            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }
            profileCompleted.put("skills", true);
            existingEmployee.setProfileCompleted(profileCompleted);

            // Save the updated employee
            employeeRepository.save(existingEmployee);
        }

        return empSkillsModel;
    }


    public EmpSkillsModel updateEmpSkills(String id, EmpSkillsModel empSkills) {
        EmpSkillsModel existingEmpSkills = empSkillsRepository.findById(id).orElse(null);
        if (existingEmpSkills != null) {
            existingEmpSkills.setEmployeeId(empSkills.getEmployeeId());
            existingEmpSkills.setSkills(empSkills.getSkills());
            return empSkillsRepository.save(existingEmpSkills);
        }
        return null;
    }

    public void deleteEmpSkills(String employeeId) {
        empSkillsRepository.deleteByEmployeeId(employeeId);
    }

    @Async
    public CompletableFuture<List<EmpSkillsModel>> getEmpSkillsByEmployeeIdAsync(String employeeId) {
        // Fetch employees asynchronously
        List<EmpSkillsModel> empSkills = getEmpSkillsByEmployeeId(employeeId);
        return CompletableFuture.completedFuture(empSkills);
    }
}
