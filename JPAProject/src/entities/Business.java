package entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Business {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToOne
	@JoinColumn
	private Contact contact;
	
	@OneToOne
	private Specialty specialty; 
	
	private double rating;
	
	@Column(name="labor_rate")
	private double laborRate;
	
	@Column(name="company_name")
	private String companyName;
	
	private int experience;
	
	private String website;
	
	private List<Certification> certifications;
	
	
}
