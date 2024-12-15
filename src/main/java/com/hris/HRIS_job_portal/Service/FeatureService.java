package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.FeatureModel;
import com.hris.HRIS_job_portal.Repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {
    @Autowired
    private FeatureRepository featureRepository;

    public FeatureModel addFeature(FeatureModel feature) {
        return featureRepository.save(feature);
    }

    public List<FeatureModel> getAllFeatures() {
        return featureRepository.findAll();
    }

    public FeatureModel updateAttachment(FeatureModel feature) {
        Optional<FeatureModel> featureModel = featureRepository.findById(feature.getId());
        if (featureModel.isPresent()) {
            FeatureModel existingFeature = featureModel.get();
            existingFeature.setAttachment(feature.getAttachment());
            return featureRepository.save(existingFeature);
        }
        return null;
    }
}