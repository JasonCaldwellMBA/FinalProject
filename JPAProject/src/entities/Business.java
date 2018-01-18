package entities;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Business {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@OneToOne(cascade=CascadeType.PERSIST)
	@JoinColumn(name="contact_id")
	private Contact contact;
	
	@OneToOne(cascade=CascadeType.PERSIST)
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
	@JsonIgnore
	@OneToMany(mappedBy="business")
	private List<Certification> certifications;
	private boolean active; 
	@JsonIgnore
	@OneToMany(mappedBy="business")
	private List<Notification> notifications; 
	
	@Column(name = "login_name")
	private String loginName;
	@Column(name = "login_password")
	private String loginPassword;
	
	public Contact getContact() {
		return contact;
	}
	public void setContact(Contact contact) {
		this.contact = contact;
	}
	public Rating getRating() {
		return rating;
	}
	public void setRating(Rating rating) {
		this.rating = rating;
	}
	public double getLaborRate() {
		return laborRate;
	}
	public void setLaborRate(double laborRate) {
		this.laborRate = laborRate;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public int getExperience() {
		return experience;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public List<Certification> getCertifications() {
		return certifications;
	}
	public void setCertifications(List<Certification> certifications) {
		this.certifications = certifications;
	}
	public int getId() {
		return id;
	}
	
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	
	
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}
	public String getLoginPassword() {
		return loginPassword;
	}
	public void setLoginPassword(String loginPassword) {
		this.loginPassword = loginPassword;
	}
	public List<Notification> getNotifications() {
		return notifications;
	}
	public void setNotifications(List<Notification> notifications) {
		this.notifications = notifications;
	}
	@Override
	public String toString() {
		return "Business [id=" + id + ", contact=" + contact + ", rating=" + rating + ", laborRate=" + laborRate
				+ ", companyName=" + companyName + ", experience=" + experience + ", website=" + website + "]";
	}
}












