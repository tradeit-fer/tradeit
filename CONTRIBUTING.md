# Contributing Guidelines

Ovaj dokument definira pravila za rad na TradeIt projektu i korištenje Gita.

## 1. Branch Naming Convention

Svaki zadatak razvija se na zasebnoj grani. Direktan rad na `main` grani nije dopušten.

Nazivi grana koriste sljedeći format:

`<type>/SCRUM-<number>-<short-description>`

Primjeri:
- `feature/SCRUM-15-user-login`
- `bugfix/SCRUM-18-login-error`
- `docs/SCRUM-20-update-readme`
- `chore/SCRUM-22-git-standards`

Vrste grana:
- `feature` – nova funkcionalnost
- `bugfix` – ispravak greške
- `docs` – promjene dokumentacije
- `chore` – tehničke i pomoćne promjene

## 2. Commit Message Convention

Commit poruke trebaju biti kratke, jasne i opisivati napravljenu promjenu.

Koristi se sljedeći format:

`<type>: <short-description>`

Primjeri:
- `feat: add user login`
- `fix: resolve database connection error`
- `docs: update README`
- `test: add backend tests`
- `ci: configure GitHub Actions`
- `chore: add git contribution standards`

Vrste commit poruka:
- `feat` – nova funkcionalnost
- `fix` – ispravak greške
- `docs` – dokumentacija
- `test` – dodavanje ili izmjena testova
- `ci` – promjene CI/CD konfiguracije
- `chore` – ostale tehničke promjene

## 3. Feature Branch Workflow

Za svaki Jira zadatak potrebno je slijediti ovaj postupak:

1. Preuzeti najnovije promjene s grane `main`.
2. Kreirati novu granu za zadatak.
3. Raditi promjene isključivo na vlastitoj grani.
4. Spremiti promjene pomoću smislenih commit poruka.
5. Poslati granu na GitHub.
6. Otvoriti Pull Request prema grani `main`.
7. Nakon pregleda i odobrenja spojiti Pull Request u `main`.

## 4. Main Branch Rules

- Na grani `main` ne radi se direktno.
- Sve promjene moraju doći putem Pull Requesta.
- Pull Request treba biti pregledan prije spajanja.
- Automatske provjere (CI) moraju uspješno proći prije spajanja.