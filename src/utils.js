const manageException = (code = null) => {
  code = code ? parseInt(code) : "inconnu";

  switch (code) {
    case 400:
    return {
      type: 'error',
      text1: "Action impossible!",
      text2: "Veuillez vérifier les informations saisies avant de réessayer!"
    };
    break;
    case 401:
    return {
      type: 'error',
      text1: "Vous n'êtes pas authorizé à vous connecter.",
      text2: "Veuillez vérifier vos identifiants avant de réessayer!"
    };
    break;
    case 500:
    return {
      type: 'error',
      text1: 'Une erreur côté serveur est survenue.',
      text2: "Essayer de vous déconnecter et reconnecter.\nSi l'erreur persiste contactez un administrateur pour plus d'infos."
    };
    break;
    default:
    return {
      type: 'error',
      text1: 'Erreur ' + code,
      text2: "Vérifiez si vous êtes connecté à internet!\nSi l'erreur persiste contactez un administrateur pour plus d'infos."
    };
  }
}
export default manageException;
