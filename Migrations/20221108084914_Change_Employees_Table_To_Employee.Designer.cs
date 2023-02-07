﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using coreAPI.Repository;

#nullable disable

namespace Project3.Migrations
{
    [DbContext(typeof(SqlDatabaseContext))]
    [Migration("20221108084914_Change_Employees_Table_To_Employee")]
    partial class Change_Employees_Table_To_Employee
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Project3.Model.BreakTime", b =>
                {
                    b.Property<Guid>("BreakTimeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime?>("BreakTimeEnd")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("BreakTimeStart")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("EmployeeID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("BreakTimeID");

                    b.HasIndex("EmployeeID");

                    b.ToTable("BreakTime");
                });

            modelBuilder.Entity("Project3.Model.Employee", b =>
                {
                    b.Property<Guid>("EmployeeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("EmployeeID");

                    b.ToTable("Employee");
                });

            modelBuilder.Entity("Project3.Model.WorkHours", b =>
                {
                    b.Property<Guid>("WorkHoursID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CheckInDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CheckOutDate")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("EmployeeID")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("WorkHoursID");

                    b.HasIndex("EmployeeID");

                    b.ToTable("WorkHours");
                });

            modelBuilder.Entity("Project3.Model.BreakTime", b =>
                {
                    b.HasOne("Project3.Model.Employee", "Employee")
                        .WithMany("Breaktimes")
                        .HasForeignKey("EmployeeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("Project3.Model.WorkHours", b =>
                {
                    b.HasOne("Project3.Model.Employee", "Employee")
                        .WithMany("WorkHours")
                        .HasForeignKey("EmployeeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("Project3.Model.Employee", b =>
                {
                    b.Navigation("Breaktimes");

                    b.Navigation("WorkHours");
                });
#pragma warning restore 612, 618
        }
    }
}
