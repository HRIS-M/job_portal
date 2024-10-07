package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.IssueModel;
import com.hris.HRIS_job_portal.Repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    public IssueModel addIssue(IssueModel issue) {
        return issueRepository.save(issue);
    }

    public List<IssueModel> getAllIssues() {
        return issueRepository.findAll();
    }
}