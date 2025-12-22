package com.dakshin.spring_boot_rest.service;

import com.dakshin.spring_boot_rest.model.JobPost;
import com.dakshin.spring_boot_rest.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class JobService {

    @Autowired
    private JobRepo repo;
    public void addJob(JobPost jobPost) {
        repo.addJob(jobPost);
    }
    public List<JobPost> getAllJobs() {
        return repo.getAllJobs();
    }

    public JobPost getJob(int i) {
        return repo.getJob(i);
    }

    public void updateJob(int postId, JobPost jobPost) {
        repo.updateJob(postId,jobPost);
    }

    public void deleteJob(int postId) {
        repo.deleteJob(postId);
    }
}
