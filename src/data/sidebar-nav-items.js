export default function () {
  return [{
    title: 'Tableau de Bord',
    to: {
      name: 'blog-overview',
    },
    htmlBefore: '<i class="material-icons">dashboard</i>',
    htmlAfter: '',
  },
    {
    title: 'Liste des Évaluations',
    htmlBefore: '<i class="material-icons">assignment</i>',
    to: {
      name: 'list',
    },
    },
    {
      title: 'Ajouter Evaluation',
      htmlBefore: '<i class="fas fa-plus-circle"></i>',
      to: { name: 'addevaluation',}
    },
    {
      title: 'Calendrier',
      htmlBefore: '<i class="material-icons">calendar_today</i>',
      to: {
        name: 'calendar',
      },
    },
    {
      title: 'respond',
      htmlBefore: '<i class="material-icons"></i>',
      to: {
        name: 'respond',
      },
    },
    {
    title: 'Ajouter une Évaluation',
    htmlBefore: '<i class="material-icons">note_add</i>',
    to: {
      name: 'add-new-post',
    },
  },
    {
      title: 'Equipes',
      htmlBefore: '<i class="material-icons">group</i>',
      to: {
        name: 'equipes',
      },
    },
    {
    title: 'Ajouter Employee',
    htmlBefore: '<i class="material-icons">person_add</i>',
    to: {
      name: 'add-employee',
    }},
    {
    title: 'Gestion des Objectifs',
    htmlBefore: '<i class="material-icons">view_module</i>',
    to: {
      name: 'objectifs',
    },
  },
    {
      title: 'Suivi des Objectifs',
      htmlBefore: '<i class="material-icons">track_changes</i>',
      to: {
        name: 'objectifs-tracking', // Vue pour suivre les objectifs des employés
      },
    },
    {
      title: 'Rapports d\'Évaluation',
      htmlBefore: '<i class="material-icons">bar_chart</i>',
      to: {
        name: 'report', // Vue pour accéder aux rapports d'évaluation
      },

    },
    {
    title: 'Profile',
    htmlBefore: '<i class="material-icons">person</i>',
    to: {
      name: 'user-profile-lite',
    },
  }, {
    title: 'Campagne',
    htmlBefore: '<i class="material-icons">campaign</i>',
    to: {
      name: 'campagne',
    },
  },
    {
      title: 'Consulter Campagne',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: {
        name: 'consulter',
      },
    }
  ];
}
