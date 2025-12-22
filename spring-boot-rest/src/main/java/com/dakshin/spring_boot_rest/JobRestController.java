package com.dakshin.spring_boot_rest;


import com.dakshin.spring_boot_rest.model.JobPost;
import com.dakshin.spring_boot_rest.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController //what ever we return treat it as a body not view page
@CrossOrigin(origins = "http://localhost:3000")//Used to connect react
public class JobRestController {

    @Autowired
    private JobService service;


    @GetMapping(path="jobPosts",produces = {"application/json"}) //with path and produces we can set that it only sends json
    @ResponseBody
    public List<JobPost> getAllJobs(){
        return service.getAllJobs();
    }

    @GetMapping("jobPost/{postId}")
    public JobPost getJob(@PathVariable int postId){ //or we can write @PostVariable("variableName")
        return service.getJob(postId);
    }

    @PostMapping("jobPost") //similarly like produces we can use consumes to set that it receives only json data not xml
    public void addJob(@RequestBody JobPost jobPost){
        service.addJob(jobPost);
    }
    @PutMapping("jobPost/{postId}")
    public void updateJob(@PathVariable int postId,@RequestBody JobPost jobPost){
        service.updateJob(postId,jobPost);
    }

    @DeleteMapping("jobPost/{postId}")
    public void deleteJob(@PathVariable int postId){
        service.deleteJob(postId);
    }

}
