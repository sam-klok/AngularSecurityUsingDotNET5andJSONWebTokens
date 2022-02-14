use PTC

SELECT TOP (1000) [UserId]
      ,[UserName]
      ,[Password]
FROM [PTC].[Security].[User]

SELECT TOP (1000) [ClaimId]
      ,[UserId]
      ,[ClaimType]
      ,[ClaimValue]
FROM [PTC].[Security].[UserClaim]
--where UserId = '8D6065B8-8399-4D38-BF7F-24BD8F8A2272'
where UserId in (select userid from Security.[User] where UserName = 'sklokov')