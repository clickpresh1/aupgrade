package com.aupgrade.aupgrade;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;∏
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aupgrade.aupgrade.dto.request.SubmitRequest;
import com.aupgrade.aupgrade.dto.response.RecommendationResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8080") 
public class AupgradeController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/submit")
    public User submit(@RequestBody SubmitRequest req) {
        User profile = new User();
        profile.setName(req.name());
        profile.setSector(req.sector());
        profile.setIncomeRange(req.incomeRange());
        profile.setPerc(req.perc());
        User savedProfile = repo.save(profile);
        return savedProfile;
    } 

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @GetMapping("/recommendation")
    public RecommendationResponse getRecommendation(
            @RequestParam String sector,
            @RequestParam int yourPercentage) {

        List<User> sameSector = repo.findBySector(sector);
        long totalSameSector = sameSector.size();

        long moreAggressive = sameSector.stream()
                .filter(p -> p.getPerc() > yourPercentage)
                .count();

        double avg = repo.avgPercentageBySector(sector);
        if (Double.isNaN(avg)) {
            avg = 0.0;
        }

        String message;
        if (totalSameSector == 0) {
            message = "Be the first from " + sector + "!";
        } else {
            double percentile = (moreAggressive * 100.0) / totalSameSector;
            message = String.format(
                "You are more aggressive than %.0f%% of %s employees!",
                100 - percentile,
                sector
            );
        }

        return new RecommendationResponse(
            message,
            yourPercentage,
            avg,
            moreAggressive,
            totalSameSector
        );
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Long> topSectors = repo.findAll().stream()
                .collect(Collectors.groupingBy(User::getSector, Collectors.counting()))
                .entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(
                    Map.Entry::getKey,
                    Map.Entry::getValue
                ));

        return Map.of(
            "totalUsers", repo.count(),
            "topCompanies", topSectors
        );
    }
}

