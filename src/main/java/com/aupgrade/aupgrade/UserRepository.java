package com.aupgrade.aupgrade;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findBySector(String sector);

    long countBySector(String sector);

    @Query("SELECT COALESCE(AVG(i.perc), 0.0) FROM User i WHERE i.sector = :sector")
    Double avgPercentageBySector(@Param("sector") String sector);
}
