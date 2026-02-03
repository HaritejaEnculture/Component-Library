flowchart TD
    Start[Input: User Data / Status] --> Q1{Determine Sentiment}
    
    %% Excellent / Promoter
    Q1 -- Excellent/Promoter --> Res1[Use SUCCESS Logic]
    Res1 --> Apply1[Heatmap: EnGreen.900]
    Res1 --> Apply2[eNPS: EnGreen.500]
    
    %% Moderate / Passive
    Q1 -- Moderate/Passive --> Res2[Use WARNING Logic]
    Res2 --> Apply3[Heatmap: EnYellow.300]
    Res2 --> Apply4[eNPS: EnYellow.500]
    
    %% Critical / Detractor
    Q1 -- Critical/Detractor --> Res3[Use ERROR Logic]
    Res3 --> Apply5[Heatmap: EnError.500]
    Res3 --> Apply6[eNPS: EnCoral.500]