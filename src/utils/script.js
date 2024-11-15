const fs = require("fs");

const incidents = Array.from({ length: 50 }, (_, i) => ({
  id: `PT4KHLK${i}`,
  type: "incident",
  summary: `[#${1234 + i}] The server ${
    i % 2 === 0 ? "is on fire" : "is overloaded"
  }.`,
  self: `https://api.pagerduty.com/incidents/PT4KHLK${i}`,
  html_url: `https://subdomain.pagerduty.com/incidents/PT4KHLK${i}`,
  incident_number: 1234 + i,
  title: i % 2 === 0 ? "The server is on fire." : "The server is overloaded.",
  created_at: `2015-10-06T21:30:${String(42 + i).padStart(2, "0")}Z`,
  updated_at: `2015-10-06T21:40:${String(23 + i).padStart(2, "0")}Z`,
  status: i % 3 === 0 ? "triggered" : i % 3 === 1 ? "acknowledged" : "resolved",
  incident_key: `baf7cf21b1da41b4b0221008339ff${i}`,
  service: {
    id: `PIJ90N7${i}`,
    type: "service_reference",
    summary: i % 2 === 0 ? "My Mail Service" : "Database Service",
    self: `https://api.pagerduty.com/services/PIJ90N7${i}`,
    html_url: `https://subdomain.pagerduty.com/service-directory/PIJ90N7${i}`,
  },
  assignments: [],
  assigned_via: "escalation_policy",
  last_status_change_at: `2015-10-06T21:38:${String(23 + i).padStart(2, "0")}Z`,
  resolved_at:
    i % 3 === 2 ? `2015-10-06T21:38:${String(23 + i).padStart(2, "0")}Z` : null,
  first_trigger_log_entry: {
    id: `Q02JTSNZWHSEKV${i}`,
    type: "trigger_log_entry_reference",
    summary: "Triggered through the API",
    self: `https://api.pagerduty.com/log_entries/Q02JTSNZWHSEKV${i}?incident_id=PT4KHLK${i}`,
    html_url: `https://subdomain.pagerduty.com/incidents/PT4KHLK${i}/log_entries/Q02JTSNZWHSEKV${i}`,
  },
  alert_counts: {
    all: 2 + i,
    triggered: i % 3 === 0 ? 1 : 0,
    resolved: i % 3 === 2 ? 2 + i : 0,
  },
  is_mergeable: i % 2 === 0,
  incident_type: {
    name: i % 2 === 0 ? "incident_default" : "critical_incident",
  },
  escalation_policy: {
    id: `PT20YPA${i}`,
    type: "escalation_policy_reference",
    summary:
      i % 2 === 0 ? "Default Escalation Policy" : "High Escalation Policy",
    self: `https://api.pagerduty.com/escalation_policies/PT20YPA${i}`,
    html_url: `https://subdomain.pagerduty.com/escalation_policies/PT20YPA${i}`,
  },
  teams: [
    {
      id: `PQ9K7I8${i}`,
      type: "team_reference",
      summary: i % 2 === 0 ? "Engineering" : "Operations",
      self: `https://api.pagerduty.com/teams/PQ9K7I8${i}`,
      html_url: `https://subdomain.pagerduty.com/teams/PQ9K7I8${i}`,
    },
  ],
  pending_actions: [],
  acknowledgements: [],
  alert_grouping: {
    grouping_type: "advanced",
    started_at: `2015-10-06T21:30:${String(42 + i).padStart(2, "0")}Z`,
    ended_at:
      i % 2 === 0
        ? null
        : `2015-10-06T21:40:${String(23 + i).padStart(2, "0")}Z`,
    alert_grouping_active: i % 2 === 0,
  },
  last_status_change_by: {
    id: `PXPGF42${i}`,
    type: "user_reference",
    summary: i % 2 === 0 ? "Earline Greenholt" : "Aiden Liu",
    self: `https://api.pagerduty.com/users/PXPGF42${i}`,
    html_url: `https://subdomain.pagerduty.com/users/PXPGF42${i}`,
  },
  priority: {
    id: `P53ZZH5${i}`,
    type: "priority_reference",
    summary: i % 2 === 0 ? "P2" : "P1",
    self: `https://api.pagerduty.com/priorities/P53ZZH5${i}`,
  },
  resolve_reason: null,
  conference_bridge: {
    conference_number: "+1-415-555-1212,,,,1234#",
    conference_url: "https://example.com/acb-123",
  },
  incidents_responders: [],
  responder_requests: [],
  urgency: i % 2 === 0 ? "high" : "low",
}));

fs.writeFile("output.json", JSON.stringify(incidents), (err) => {
  if (err) {
    console.error("Error writing to file", err);
  } else {
    console.log("File has been saved!");
  }
});
