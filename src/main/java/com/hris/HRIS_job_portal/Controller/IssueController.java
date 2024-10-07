package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.IssueModel;
import com.hris.HRIS_job_portal.Service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v2/portal_report-issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping("/add")
    public IssueModel addIssue(@RequestBody IssueModel issue) {
        return issueService.addIssue(issue);
    }

    @PostMapping("/all")
    public List<IssueModel> getAllIssues() {
        return issueService.getAllIssues();
    }
}