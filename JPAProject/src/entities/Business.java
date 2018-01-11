package entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
@Entity
public class Business {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="contact_id")
	private Contact contact;
	
	@ManyToOne
	@JoinTable(name="specialty",
			joinColumns=@JoinColumn(name="specialty_id"),
			inverseJoinColumns=@JoinColumn(name="specialty_id"))
	private Specialty specialty; 
	
	@OneToOne
	@JoinColumn(name="rating_id")
	private double rating;
	
	@Column(name="labor_rate")
	private double laborRate;
	
	@Column(name="company_name")
	private String companyName;
	
	private int experience;
	
	private String website;
	
	@JoinTable(name="certifications",
			joinColumns=@JoinColumn(name="business_id"),
			inverseJoinColumns=@JoinColumn(name="certification_type_id"))
	private List<Certification> certifications;
}












