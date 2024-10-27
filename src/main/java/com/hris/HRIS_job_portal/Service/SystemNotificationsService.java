package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.SystemNotificationsModel;
import com.hris.HRIS_job_portal.Repository.SystemNotificationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SystemNotificationsService {
    @Autowired
    private SystemNotificationsRepository notificationRepository;

    public List<SystemNotificationsModel> getActiveNotifications() {
        return notificationRepository.findByActive(true);
    }

    public List<SystemNotificationsModel> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public SystemNotificationsModel createNotification(SystemNotificationsModel notification) {
        return notificationRepository.save(notification);
    }

    public SystemNotificationsModel updateNotification(SystemNotificationsModel notification) {
        return notificationRepository.save(notification);
    }

    public SystemNotificationsModel updateNotificationStatus(String id) {
        Optional<SystemNotificationsModel> notification = notificationRepository.findById(id);
        if (notification.isPresent()) {
            SystemNotificationsModel notificationObj = notification.get();
            notificationObj.setActive(!notificationObj.isActive());
            return notificationRepository.save(notificationObj);
        }
        return null;
    }

    public void deleteNotification(String id) {
        notificationRepository.deleteById(id);
    }
}