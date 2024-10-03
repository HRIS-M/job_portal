package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.JobApplyModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplyRepository extends MongoRepository<JobApplyModel, String> {
    Optional<List<JobApplyModel>> findAllByCompanyId(String companyId);

    Optional<List<JobApplyModel>> findAllByJobId(String jobId);

    Optional<JobApplyModel> findByJobId(String id);
}
