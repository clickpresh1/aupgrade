package com.aupgrade.aupgrade;

// import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user profiles")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String sector;
    private String incomeRange;
    private int perc;

    // private LocalDateTime submittedAt = LocalDateTime.now();

    public User () {

    } 

    public User (String name, String sector, String incomeRange, int perc) {
        this.name = name;
        this.sector = sector;
        this.incomeRange = incomeRange;
        this.perc = perc;
    } 

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    } 

    public String getIncomeRange() {
        return incomeRange;
    } 

    public void setIncomeRange(String incomeRange) {
        this.incomeRange = incomeRange;
    }

    public int getPerc() {
        return perc;
    }

    public void setPerc(int perc) {
        this.perc = perc;
    }

    
}
