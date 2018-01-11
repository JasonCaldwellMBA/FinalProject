package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Business {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private Contact contact;
	
	private Specialty specialty; 
	
	private double rating;
	
	@Column(name="labor_rate")
	private double laborRate;
	
	@Column(name="company_name")
	private String companyName;
	
	private int experience;
	
	private String website;
	
}
