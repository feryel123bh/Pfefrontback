<template>
  <div>
    <h2>Interview Calendar</h2>
    <vue-cal
      style="height: 700px"
      :events="events"
      :drag-and-drop="true"
      @cell-click="createEvent"
      @event-drop="updateEvent"
      @event-click="showEventActions"
    />

    <!-- Modal with Backdrop -->
    <div v-if="popoverVisible">
      <div class="modal-backdrop"></div>
      <div class="modal">
        <div class="modal-content">
          <h3>{{ selectedEvent ? selectedEvent.title : 'No Event Selected' }}</h3>
          <p>Start: <input type="datetime-local" v-model="updatedStart" /></p>
          <p>End: <input type="datetime-local" v-model="updatedEnd" /></p>
          <button @click="saveEvent">Save</button>
          <button @click="deleteEvent(selectedEvent)">Delete</button>
          <button @click="popoverVisible = false">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'InterviewCalendar',
  components: {
    VueCal,
  },
  data() {
    return {
      events: [
        {
          id: 1,
          start: new Date(2024, 7, 21, 9, 0),
          end: new Date(2024, 7, 21, 10, 0),
          title: 'Interview with John Doe',
        },
        {
          id: 2,
          start: new Date(2024, 7, 22, 11, 0),
          end: new Date(2024, 7, 22, 12, 0),
          title: 'Interview with Jane Smith',
        },
      ],
      selectedEvent: null,
      updatedStart: '',
      updatedEnd: '',
      popoverVisible: false,
    };
  },
  methods: {
    createEvent(date) {
      const title = prompt('Enter interview title:');
      if (title) {
        const id = Date.now(); // Simple ID based on current timestamp
        this.events.push({
          id,
          start: date,
          end: new Date(date.getTime() + 60 * 60 * 1000), // Adds 1 hour
          title,
        });
      }
    },
    updateEvent(event) {
      console.log('Event dropped:', event);
      const updatedEvent = this.events.find(e => e.id === event.id);
      if (updatedEvent) {
        updatedEvent.start = event.start;
        updatedEvent.end = event.end;
      }
    },
    showEventActions(event) {
      console.log('Event clicked:', event);
      this.selectedEvent = event;
      this.updatedStart = this.formatDateForInput(event.start);
      this.updatedEnd = this.formatDateForInput(event.end);
      this.popoverVisible = true; // Show modal
    },
    saveEvent() {
      const event = this.selectedEvent;
      event.start = new Date(this.updatedStart);
      event.end = new Date(this.updatedEnd);
      this.popoverVisible = false; // Close modal
    },
    deleteEvent(event) {
      console.log('Deleting event:', event);
      this.events = this.events.filter(e => e.id !== event.id);
      this.popoverVisible = false; // Close modal
    },
    formatDateForInput(date) {
      const d = new Date(date);
      const pad = n => (n < 10 ? '0' + n : n);
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  font-family: Arial, sans-serif;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.modal-content {
  display: flex;
  flex-direction: column;
}

.modal button {
  margin-top: 10px;
}
</style>
