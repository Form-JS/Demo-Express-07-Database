-- # DDL #  Création de la table
CREATE TABLE [Message] (
	MessageId BIGINT IDENTITY,
	Pseudo NVARCHAR(50) NOT NULL,
	Content NVARCHAR(1000) NOT NULL,
	CreateDate DATETIME2 DEFAULT GETDATE(),
	CONSTRAINT PK_Message PRIMARY KEY(MessageId),
	CONSTRAINT CK_Message__Pseudo CHECK(TRIM(Pseudo) NOT LIKE ''),
	CONSTRAINT CK_Message__Content CHECK(TRIM(Content) NOT LIKE '')
);

-- # DML #  Ajout de données
INSERT INTO [Message] (Pseudo, Content)
 VALUES ('Zaza', N'Initial Message in DB ♥');

INSERT INTO [Message] (Pseudo, Content)
 VALUES ('Pierre', N'Ceci est un test !');

-- # DRL #  Recuperation de données
SELECT [MessageId], [Pseudo], [Content] AS [Contenu], [CreateDate] AS [Date de création]
FROM [Message]
