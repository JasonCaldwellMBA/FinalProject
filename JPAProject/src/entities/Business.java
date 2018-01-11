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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
@Entity
public class Business {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="contact_id")
	private Contact contact;
	
	@OneToOne
	@JoinColumn(name="rating_id")
	private Rating rating;
	
	@Column(name="labor_rate")
	private double laborRate;
	
	@Column(name="company_name")
	private String companyName;
	
	@Column(name="experience")
	private int experience;
	
	@Column(name="website")
	private String website;
	
	@OneToMany(mappedBy="business")
	private List<Certification> certifications;
}












